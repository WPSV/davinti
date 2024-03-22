export function telefone(event) {
  event.currentTarget.maxLength = 15;
  let value = event.currentTarget.value;
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d{5})(\d)/, "($1) $2-$3");
  event.currentTarget.value = value;
  return event;
}

export function idade(event) {
  event.currentTarget.maxLength = 3;
  let value = event.currentTarget.value;
  value = value.replace(/\D/g, "");
  event.currentTarget.value = value;
  return event;
}