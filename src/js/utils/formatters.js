/**
 * Utilitários de Formatação - GarageERP
 *
 * Centraliza funções de formatação de data, moeda e strings para uso em todo o sistema.
 */

const Formatters = {
    /**
     * Formata uma data ISO ou timestamp para o padrão DD/MM/AAAA.
     * @param {string|Date} data
     * @returns {string}
     */
    formatarDataCurta(data) {
        if (!data) return "";
        return new Date(data).toLocaleDateString("pt-BR");
    },

    /**
     * Formata uma data para o padrão 'DD de mes. de AAAA'.
     * @param {string|Date} data
     * @returns {string}
     */
    formatarDataPorExtenso(data) {
        if (!data) return "";
        const d = new Date(data);
        const dia = String(d.getDate()).padStart(2, "0");
        const meses = [
            "jan.",
            "fev.",
            "mar.",
            "abr.",
            "mai.",
            "jun.",
            "jul.",
            "ago.",
            "set.",
            "out.",
            "nov.",
            "dez.",
        ];
        const mes = meses[d.getMonth()];
        const ano = d.getFullYear();
        return `${dia} de ${mes} de ${ano}`;
    },

    /**
     * Formata uma data para o padrão 'DD de mes. de AAAA, HH:MM'.
     * @param {string|Date} data
     * @returns {string}
     */
    formatarDataEHoraPorExtenso(data) {
        if (!data) return "";
        const d = new Date(data);
        const dataExtenso = this.formatarDataPorExtenso(data);
        const horas = String(d.getHours()).padStart(2, "0");
        const minutos = String(d.getMinutes()).padStart(2, "0");
        return `${dataExtenso}, ${horas}:${minutos}`;
    },

    /**
     * Formata uma data ISO ou timestamp para o padrão DD/MM/AAAA às HH:MM.
     * @param {string|Date} data
     * @returns {string}
     */
    formatarDataCompleta(data) {
        if (!data) return "";
        return new Date(data).toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    },

    /**
     * Formata um valor numérico para a moeda brasileira (R$).
     * @param {number} valor
     * @returns {string}
     */
    formatarMoeda(valor) {
        return Number(valor || 0).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    },

    /**
     * Converte uma string de moeda (ex: R$ 1.200,50) para um número (1200.50).
     * @param {string} valor
     * @returns {number}
     */
    converterValorMoeda(valor) {
        const texto = String(valor || "0")
            .replace("R$", "")
            .replace(/\./g, "")
            .replace(",", ".")
            .trim();

        return Number(texto) || 0;
    },

    /**
     * Escapa caracteres HTML para prevenir XSS.
     * @param {string} valor
     * @returns {string}
     */
    escaparHtml(valor) {
        return String(valor || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    },

    /**
     * Formata placa de veículo (Brasil AAA-1234 ou Mercosul AAA1A11).
     * @param {string} valor
     * @returns {string}
     */
    formatarPlaca(valor) {
        let v = String(valor || "")
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, "");

        if (v.length > 7) v = v.slice(0, 7);

        // Lógica de diferenciação:
        // Padrão Antigo: ABC-1234 (o 5º caractere é um número)
        // Padrão Mercosul: ABC1D23 (o 5º caractere é uma letra)
        if (v.length >= 5) {
            const quintoCaracter = v[4];
            const ehNumero = /[0-9]/.test(quintoCaracter);

            if (ehNumero) {
                // Se o 5º for número, assume padrão antigo e põe o traço
                return v.slice(0, 3) + "-" + v.slice(3);
            }
        }

        return v;
    },
};

// Vincula ao escopo global para compatibilidade com o sistema atual
window.Formatters = Formatters;
