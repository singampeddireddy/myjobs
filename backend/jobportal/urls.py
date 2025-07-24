from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from core.views import JobListView
from django.http import HttpResponse


def home(request):
    return HttpResponse("Welcome to My Job Portal!")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
    path('', home),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
