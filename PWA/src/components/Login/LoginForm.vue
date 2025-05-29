<template>
  <main class="login-container">
    <img
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/63f7ec5a6e3239abf9bc60335494713658fa4822?placeholderIfAbsent=true&apiKey=d7529c299f4b4582ae3b5f27ac36f58d"
      alt="Logo"
      class="logo"
    />
    <h1 class="app-title">Eyes Everywhere</h1>
    <p class="app-subtitle">Veja, Reporte e Resolva</p>
    <div id="googleSignInButton" class="google-button-container"></div>
  </main>
</template>


<script>
export default {
  name: "LoginForm",
  mounted() {
    this.loadGoogleSignInScript();
  },
  methods: {
    loadGoogleSignInScript() {
      if (typeof google === "undefined" || !google.accounts) {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = this.initializeGoogleSignIn;
        document.body.appendChild(script);
      } else {
        this.initializeGoogleSignIn();
      }
    },

    initializeGoogleSignIn() {
      google.accounts.id.initialize({
        client_id: "872327475930-lkter6krmeh53tiup93ulun9suhli311.apps.googleusercontent.com",
        callback: this.handleCredentialResponse,
      });

      google.accounts.id.renderButton(
        document.getElementById("googleSignInButton"),
        { theme: "outline", size: "large" }
      );

      google.accounts.id.prompt();
    },

    handleCredentialResponse(response) {
      const decodedToken = this.parseJwt(response.credential);
      localStorage.setItem("googleUserName", decodedToken.name);
      localStorage.setItem("googleUserEmail", decodedToken.email);
      localStorage.setItem("googleUserPicture", decodedToken.picture);

      alert("Login efetuado com sucesso como: " + decodedToken.name);
      this.$router.push("/auditorias");
    },

    parseJwt(token) {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    },
  },
};
</script>

<style scoped>
.login-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  text-align: center;
  padding: 20px;
  transform: translateY(-30px); /* <- move tudo ligeiramente para cima */
}

.logo {
  width: 180px; /* <- logo maior */
  height: auto;
  margin-bottom: 20px;
}

.app-title {
  font-size: 24px;
  font-weight: 700;
  color: #000;
  margin: 0;
}

.app-subtitle {
  font-size: 14px;
  font-weight: 500;
  color: #555;
  margin: 8px 0 30px;
}

.google-button-container {
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 300px;
}

/* Responsivo */
@media (max-width: 480px) {
  .logo {
    width: 140px; /* proporcional ao novo tamanho */
  }

  .app-title {
    font-size: 20px;
  }

  .app-subtitle {
    font-size: 12px;
  }
}
</style>