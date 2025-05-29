import { createRouter, createWebHashHistory } from 'vue-router';
import LoginForm from '@/components/Login/LoginForm.vue';
import AuditoriasPage from '@/components/Auditorias/AuditoriasPage.vue';
import HistoricoPage from '@/components/Historico/HistoricoPage.vue';
import Auditoria from '@/components/Auditoria.vue';
import DetalhesAuditoria from '@/components/DetalhesAuditoria.vue';
import PerfilPage from '@/components/Perfil/PerfilPage.vue';

const routes = [
  { path: '/login', name: 'Login', component: LoginForm },
  { path: '/auditorias', name: 'AuditoriasPage', component: AuditoriasPage },
  { path: '/historico', name: 'Historico', component: HistoricoPage },
  { path: '/minhas-auditorias', name: 'Auditoria', component: Auditoria },
  { path: '/auditoria-passada', name: 'DetalhesAuditoria', component: DetalhesAuditoria },
  { path: '/perfil', name: 'PerfilPage', component: PerfilPage },
  { path: '/', redirect: '/login' },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;