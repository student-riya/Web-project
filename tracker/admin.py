from django.contrib import admin
from .models import Transaction, DueNotification, EcommerceTransaction

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'category', 'payment_method', 'amount', 'date_time')
    list_filter = ('category', 'payment_method', 'date_time')
    search_fields = ('category', 'payment_method')
    ordering = ('-date_time',)

@admin.register(DueNotification)
class DueNotificationAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'title', 'amount', 'due_date', 'is_paid')
    list_filter = ('due_date', 'is_paid')
    search_fields = ('title',)
    ordering = ('due_date',)

@admin.register(EcommerceTransaction)
class EcommerceTransactionAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'item_name', 'quantity', 'amount', 'purchase_date')
    list_filter = ('purchase_date',)
    search_fields = ('item_name',)
    ordering = ('-purchase_date',)
