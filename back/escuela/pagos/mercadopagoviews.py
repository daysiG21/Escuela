import http.client

# Django
from django.conf import settings
from django.contrib.sites.models import Site
from django.urls import reverse_lazy

# Mercadopago
import mercadopago

def validar_pago(payment_id):
    """ Connect to MercadoPago"""
    conn = http.client.HTTPSConnection("api.mercadopago.com")
    headers = {
        'authorization': "Bearer " + settings.MP_ACCESS_TOKEN
    }

    conn.request("GET", f"/v1/payments/{payment_id}", headers=headers)
    res = conn.getresponse()
    data = res.read()

    return data.decode("utf-8")


def crear_preferencia(request):
    """ Se crea la preferencia desde el objeto request. """
    from .models import PagoModel
    user = request.user
    domain = Site.objects.get_current().domain  # Consigue la URL del dominio actual.
    # url = reverse_lazy('')  #TODO: Crear vista de pago exitoso
    success_url = f"{domain}/cualquier_url/"
    subscription_price = 44.68  # TODO: Calcular el precio real
    objeto_pago = PagoModel.objects.create(user=request.user, amount=subscription_price)
    # TODO: Obtener los objetos de los cursos y crear items para la preferencia
    preferencia = {
        "items": [
            {
                "id": request.user.id,  # User ID
                "title": "Curso de Quimica",
                "description": "Descripcion del curso",
                "quantity": 1,
                "currency_id": "PEN",
                "unit_price": 10  # TODO: 3.99% + 1 sol Comision de Mercadopago
            },
        ],
        "payer": {
            "name": "amaru",
            "surname": "escalante",
            "email": "correo@mail.com",
        },
        "back_urls": {
            "success": success_url,
            "pending": "",
            "failure": "",
        },
        "auto_return": "approved",
        "statement_descriptor": "ESCUELA_SUS",
        "external_reference": "1" # objeto_pago.id
    }
    mp = mercadopago.MP(settings.MP_ACCESS_TOKEN)
    resultado_preferencia = mp.create_preference(preferencia)
    print(resultado_preferencia)
    url = resultado_preferencia["response"]["init_point"]
    return url


######## VIEWS ##########
# TODO: Crear views para Django Rest Framework
# Payment Manager
from django.urls import reverse, reverse_lazy
from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect
# MercadoPago views
from .mercadopago_views import crear_preferencia, validar_pago

# class PaySubscriptionView(LoginRequiredMixin, TemplateView):
#
#     def dispatch(self, request, *args, **kwargs):
#         if self.request.user.premium_member:
#             return redirect(reverse('dashboard:home')) # Obtiene el URL
#         else:
#             url = crear_preferencia(request)
#             return redirect(url)

########## WEB HOOK ##################
# Webhooks
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import HttpResponse
from .models import PagoModel

@csrf_exempt
def payment_wh(request):
    # logger = logging.getLogger("analyzer")
    # Gets the MercadoPago Payment ID
    mp_payment_id = request.GET.get('data.id')
    # Get payment from MercadoPago API
    payment_data = validar_pago(mp_payment_id)
    # Converts it to Json
    payment_data = json.loads(payment_data)

    # print(payment_data)

    # logger.info(payment_data)
    # Get the external reference (Payment ID)
    external_reference = payment_data['external_reference']

    payment_id = external_reference
    pmt = PagoModel.objects.get(id=payment_id)
    pmt.status_detail = payment_data['status_detail']
    pmt.mp_payment_id = mp_payment_id
    if payment_data['status'] == 'approved':
        pmt.status = PagoModel.Status.APPROVED
        # logger.info("Payment has been approved")
    elif payment_data['status'] == 'in_process':
        pmt.status = PagoModel.Status.IN_PROCESS
        # logger.info("Payment is in process")
    elif payment_data['status'] == 'rejected':
        pmt.status = PagoModel.Status.REJECTED
        # logger.warning("Payment has been rejected")

    pmt.save()

    return HttpResponse("Request Received", status=200)

#########  ##################

