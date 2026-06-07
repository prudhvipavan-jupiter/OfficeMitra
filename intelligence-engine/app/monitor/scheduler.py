"""APScheduler — monitoring every 30 minutes."""
from apscheduler.schedulers.background import BackgroundScheduler

from app.config import settings
from app.monitor.runner import run_monitoring_sync

scheduler = BackgroundScheduler()


def start_scheduler():
    if scheduler.running:
        return
    scheduler.add_job(
        run_monitoring_sync,
        "interval",
        minutes=settings.monitor_interval_minutes,
        id="intel_monitor",
        replace_existing=True,
        max_instances=1,
    )
    scheduler.start()


def stop_scheduler():
    if scheduler.running:
        scheduler.shutdown(wait=False)
