import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBowlRice } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

library.add(faBowlRice);
library.add(faPencil);
library.add(faXmark);
library.add(faHome);

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router).mount("#app");
