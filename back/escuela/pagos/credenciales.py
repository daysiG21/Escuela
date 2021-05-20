
import mercadopago
#Creamos una  preferencia delaArticulo
# Agrego  el SDK DE PYTHON

sdk = mercadopago.SDK("8714496216339736")

payment_data = {
    "transaction_amount": float(request.POST.get("transaction_amount")),
    "token": request.POST.get("token"),
    "description": request.POST.get("description"),
    "installments": int(request.POST.get("installments")),
    "payment_method_id": request.POST.get("payment_method_id"),
    "payer": {
        "email": request.POST.get("email"),
        "identification": {
            "type": request.POST.get("type"), 
            "number": request.POST.get("number")
        }
    }
}

preference_data = {
    "items": [
        {
            "title": "Cursos",
            "quantity":  ,
            "unit_price": 
        }
    ]
}

preference_response = sdk.preference().create(preference_data)
preference = preference_response["response"]



payment_response = sdk.payment().create(payment_data)
payment = payment_response["response"]

print(payment)
