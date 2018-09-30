import StringMask from "string-mask";

export default {
  mounted() {
    numeral.locale("pt-br");
  },

  filters: {
    // PHONE
    phone(phone) {
      var formatter = new StringMask("(00) 00000-0000");
      var result = formatter.apply(phone);
      return result;
    },

    // CPF
    cpf(cpf) {
      var formatter = new StringMask("000.000.000-00");
      var result = formatter.apply(cpf);
      return result;
    },

    // PREÇO
    decimalNumber(preco) {
      var formatter = new StringMask('#.##0,00');
      var result = formatter.apply(preco);
      return result;
    },

    // CNPJ
    cnpj(cnpj) {
      var formatter = new StringMask('##.###.###/####-##');
      var result = formatter.apply(cnpj);
      return result;
    },

    // DATE & HOUR
    date: value =>
      value ? moment(value, "DDMMYYYY").format("DD/MM/YYYY") : "---",
    dateTime: value =>
      value ? moment(value, "DDMMYYYY").format("DD/MM/YYYY  HH:MM") : "---",
    dateMin: value =>
      value ? moment(value, "DDMMYYYY").format("DD/MM/YY") : "---",
    dateTimeMin: value =>
      value ? moment(value, "DDMMYYYY").format("DD/MM/YY HH:MM") : "---",
    hour: value => moment(value, "HH:mm").format("HH:MM"),
    secondToMinute: value =>
      value >= 0 ? moment.utc(value * 1000).format("mm:ss") : "---",

    // PERSON
    sexo: value => (value === "M" ? "Masculino" : "Feminino"),

    // TRUE OR FALSE
    conditional: value => (value === true ? "Sim" : "Não"),

    // NUMBER
    formatNumber: value => numeral(value).format("0,0"),

    // TEXT
    textEmpty: value => (!value ? "---" : value),
    cleanText: value =>
      !value ? "---" : value.replace(/[|^&;$%@"<>()+,]/g, " ")
  },
  create: function (Vue) {
    Object.keys(this.filters).forEach(
      function (filter) {
        Vue.filter(filter, this.filters[filter]);
      }.bind(this)
    );
  }
};
