export function validarEmail(email: string,refemail:()=>any) {
    const usuario = email.substring(0, email.indexOf("@"));
    const dominio = email.substring(email.indexOf("@") + 1, email.length);

    if (!((usuario.length >= 1) &&
        (dominio.length >= 3) &&
        (usuario.search("@") === -1) &&
        (dominio.search("@") === -1) &&
        (usuario.search(" ") === -1) &&
        (dominio.search(" ") === -1) &&
        (dominio.search(".") !== -1) &&
        (dominio.indexOf(".") >= 1) &&
        (dominio.lastIndexOf(".") < dominio.length - 1))) {
            refemail()
        alert("E-mail invalido");
        return
    }
//    document.getElementById("email").focus();
    return true
}