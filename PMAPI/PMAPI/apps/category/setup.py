from category.models import Category

categories = [
    {
        'name': 'Vehículo',
        'color': 'warn',
        'icon': 'directions_car',
        'category_type': 'expense'
    },
    {
        'name': 'Deporte',
        'color': 'warn',
        'icon': 'fitness_center',
        'category_type': 'expense'
    },
    {
        'name': 'Educación',
        'color': 'warn',
        'icon': 'school',
        'category_type': 'expense'
    },
    {
        'name': 'Electrónicos',
        'color': 'warn',
        'icon': 'tv',
        'category_type': 'expense'
    },
    {
        'name': 'Impuestos',
        'color': 'warn',
        'icon': 'account_balance',
        'category_type': 'expense'
    },
    {
        'name': 'Otros',
        'color': 'warn',
        'icon': 'more',
        'category_type': 'expense'
    },
    {
        'name': 'Profesionales',
        'color': 'warn',
        'icon': 'work',
        'category_type': 'expense'
    },
    {
        'name': 'Recreación',
        'color': 'warn',
        'icon': 'beach_access',
        'category_type': 'expense'
    },
    {
        'name': 'Restaurante',
        'color': 'warn',
        'icon': 'local_dining',
        'category_type': 'expense'
    },
    {
        'name': 'Ropa',
        'color': 'warn',
        'icon': 'styler',
        'category_type': 'expense'
    },
    {
        'name': 'Salud',
        'color': 'warn',
        'icon': 'local_hospital',
        'category_type': 'expense'
    },
    {
        'name': 'Servicios',
        'color': 'warn',
        'icon': 'electrical_services',
        'category_type': 'expense'
    },
    {
        'name': 'Supermercado',
        'color': 'warn',
        'icon': 'storefront',
        'category_type': 'expense'
    },
    {
        'name': 'Suscripciones',
        'color': 'warn',
        'icon': 'subscriptions',
        'category_type': 'expense'
    },
    {
        'name': 'Transporte',
        'color': 'warn',
        'icon': 'directions_bus',
        'category_type': 'expense'
    },
    {
        'name': 'Viaje',
        'color': 'warn',
        'icon': 'flight',
        'category_type': 'expense'
    },
    {
        'name': 'Vivienda',
        'color': 'warn',
        'icon': 'home',
        'category_type': 'expense'
    },
    {
        'name': 'Inversiones',
        'color': 'primary',
        'icon': 'trending_up',
        'category_type': 'income'
    },
    {
        'name': 'Salario',
        'color': 'primary',
        'icon': 'paid',
        'category_type': 'income'
    },
    {
        'name': 'Otros',
        'color': 'primary',
        'icon': 'more',
        'category_type': 'income'
    },
    {
        'name': 'Premios',
        'color': 'primary',
        'icon': 'redeem',
        'category_type': 'income'
    },
    {
        'name': 'Regalos',
        'color': 'primary',
        'icon': 'sell',
        'category_type': 'income'
    },
]

for c in categories:

    Category.objects.create(
        name=c['name'],
        color=c['color'],
        icon=c['icon'],
        category_type=c['category_type']
    )
