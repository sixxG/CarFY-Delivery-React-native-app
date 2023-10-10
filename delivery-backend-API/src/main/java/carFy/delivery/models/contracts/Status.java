package carFy.delivery.models.contracts;

public enum Status {
    NOT_CONFIRMED ("Не подтверждён"),
    CONFIRMED ("Подтверждён"),
    CANCELED ("Отменён"),
    WORKING ("Действует"),
    COMPLETED ("Завершён"),
    AWAITING_PAYMENT_FINE("Ожидает оплаты штрафа");

    private final String title;

    Status(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    @Override
    public String toString() {
        return title;
    }
}
