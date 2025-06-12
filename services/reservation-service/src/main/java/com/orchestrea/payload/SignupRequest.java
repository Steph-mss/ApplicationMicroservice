package com.orchestrea.payload;

public class SignupRequest {
    private String username;
    private String password;
    private String mail;
    private String phone;
    private String captchaResponse; // Réponse du captcha

    // + getters et setters

    public String getCaptchaToken() {
        return captchaResponse;
    }

    public void setCaptchaToken(String captchaResponse) {
        this.captchaResponse = captchaResponse;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
