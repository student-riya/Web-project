from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    TransactionViewSet,
    RegisterView,
    monthly_expenses,
    upcoming_dues,
    ecommerce_transactions,
    user_profile,  
)

router = DefaultRouter()
router.register(r'transactions', TransactionViewSet, basename='transaction')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('monthly-expenses/', monthly_expenses, name='monthly-expenses'),
    path('upcoming-dues/', upcoming_dues, name='upcoming-dues'),
    path('ecommerce-transactions/', ecommerce_transactions, name='ecommerce-transactions'),
    path('profile/', user_profile, name='user-profile'), 
]
