from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from django.contrib.auth.models import User, Group
from django.contrib.auth.admin import UserAdmin, GroupAdmin

from listings.admin_site import mikaelson_admin_site
from listings.admin import PropertyAdmin, InquiryAdmin
from listings.models import Property, Inquiry

# Register models on our custom admin site
mikaelson_admin_site.register(Property, PropertyAdmin)
mikaelson_admin_site.register(Inquiry, InquiryAdmin)
mikaelson_admin_site.register(User, UserAdmin)
mikaelson_admin_site.register(Group, GroupAdmin)

urlpatterns = [
    path("admin/", mikaelson_admin_site.urls),
    path("api/", include("listings.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
