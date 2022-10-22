from category.models import Category


categories = [{'name': 'Deporte', 'color': '#c720c7', 'icon': 'pi-stopwatch', 'category_type': 'expense'}, {'name': 'Educación', 'color': '#1927c2', 'icon': 'pi-briefcase', 'category_type': 'expense'}, {'name': 'Impuestos y Servicios', 'color': '#edc939', 'icon': 'pi-sun', 'category_type': 'expense'}, {'name': 'Otros', 'color': '#ababab', 'icon': 'pi-ellipsis-v', 'category_type': 'expense'}, {'name': 'Recreación', 'color': '#34c9c4', 'icon': 'pi-camera', 'category_type': 'expense'}, {'name': 'Salud', 'color': '#e61c3d', 'icon': 'pi-heart', 'category_type': 'expense'}, {'name': 'Supermercado', 'color': '#8f00bf', 'icon': 'pi-shopping-cart', 'category_type': 'expense'}, {'name': 'Suscripciones',
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      'color': '#e80c0c', 'icon': 'pi-youtube', 'category_type': 'expense'}, {'name': 'Transporte y vehículo', 'color': '#1569ad', 'icon': 'pi-car', 'category_type': 'expense'}, {'name': 'Viajes', 'color': '#4feaff', 'icon': 'pi-compass', 'category_type': 'expense'}, {'name': 'Vivienda', 'color': '#3a781c', 'icon': 'pi-home', 'category_type': 'expense'}, {'name': 'Inversiones', 'color': '#e3e848', 'icon': 'pi-chart-line', 'category_type': 'income'}, {'name': 'Sueldos', 'color': '#198c34', 'icon': 'pi-history', 'category_type': 'income'}, {'name': 'Otros', 'color': '#adadad', 'icon': 'pi-ellipsis-h', 'category_type': 'income'}, {'name': 'Regalos', 'color': '#4858e8', 'icon': 'pi-gift', 'category_type': 'income'}]


def initialize_categories(user):
    for c in categories:
        instance = Category.objects.create(
            name=c['name'],
            color=c['color'],
            icon=c['icon'],
            category_type=c['category_type'],
        )

        instance.created_by = user
        instance.save()
