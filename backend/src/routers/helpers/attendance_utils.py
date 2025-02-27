from datetime import datetime, timedelta

def get_time_in():
    now = datetime.now()
    time_in = now.replace(microsecond=0).time()
    return time_in,now


def get_time_out():
    now = datetime.now()
    check_out_time = now.replace(microsecond=0).time()
    return check_out_time


def get_session_time(check_in_time,check_out_time):
    if not check_in_time or not check_out_time:
        return 0, 0
    now = datetime.now()
    check_in_datetime = datetime.combine(now.date(), check_in_time)
    check_out_datetime = datetime.combine(now.date(), check_out_time)

    if check_out_datetime < check_in_datetime:
        check_out_datetime += timedelta(days=1)
    session_time = check_out_datetime - check_in_datetime

    return session_time

def is_weekend(date):
    weekday = date.weekday()
    return 1 if weekday >= 5 else 0


