# Documentacion de la API

Antes de comenzar a usar el proyecto se deben cargar los roles de usuario

``python manage.py makemigrations && python manage.py migrate && python manage.py loaddata fixtures/roles.json && python manage.py runserver``

Las colecciones para probar los endpoints de usuario se encuentran en la carpeta ``docs``.

# Cursos: https://601e0134be5f340017a1a122.mockapi.io/productos
# - Listar: GET (Url)
# - Buscar: GET (Url/id)
# - Registrar: POST (objeto curso)
# - Editar: PUT (Url/id)

# Postulante: https://601e0134be5f340017a1a122.mockapi.io/profesor
# - Registrar: POST (objeto postulante)

# Usuarios: https://601e0134be5f340017a1a122.mockapi.io/usuario
# - Buscar: GET (Url/id)
# - Registrar: POST (objeto usuario)