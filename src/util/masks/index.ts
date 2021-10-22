export function formatCPF(cpfNumberString: string) {
  const cleaned = ("" + cpfNumberString).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
  if (match) {
    return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
  }
}

export function formatCNPJ(cnpjNumberString: string) {
  const cleaned = ("" + cnpjNumberString).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/);
  if (match) {
    return `${match[1]}.${match[2]}.${match[3]}/${match[4]}-${match[5]}`;
  }
}

export function formatPhoneNumber(cnpjNumberString: string) {
  const cleaned = ("" + cnpjNumberString).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);

  if (match) {
    return `(${match[1]})${match[2]}-${match[3]}`;
  }
}
