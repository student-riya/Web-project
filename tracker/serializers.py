from rest_framework import serializers
from .models import Transaction
from .models import DueNotification, EcommerceTransaction

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'  
        read_only_fields = ['user']



    def validate_amount(self, value): 
        if value <= 0:
            raise serializers.ValidationError("Amount must be positive.")
        return value
        
class DueNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = DueNotification
        fields = '__all__'

class EcommerceTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = EcommerceTransaction
        fields = '__all__'