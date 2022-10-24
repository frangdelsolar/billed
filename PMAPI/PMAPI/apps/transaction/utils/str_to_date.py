import datetime


def get_date_from_str(str_date):
    _day = int(str_date[:2])
    _month = int(str_date[3:5])
    _year = int(str_date[6:])
    return datetime.date(
        day=_day, month=_month, year=_year)
