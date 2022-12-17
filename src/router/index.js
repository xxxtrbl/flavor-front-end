import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "../views/LoginView.vue"
import SignupView from "../views/SignupView.vue"
import InfoView from "../views/InfoView.vue"
import PublishView from "../views/PublishView.vue"
import PublishedlistView from "../views/PublishedlistView.vue"
import RequestView from "../views/RequestView.vue"
import ResponsedView from "../views/ResponsedView.vue"
import LocalflavorView from "../views/LocalflavorView.vue"
import CommentsView from "../views/CommentsView.vue"
import TRevisedView from "../views/TRevisedView.vue"
import StatisticView from "../views/StatisticView.vue"
import SearchflavorView from "../views/SearchflavorView.vue"
import RecievedmsgView from "../views/RecievedmsgView.vue"
import FeestatisticView from "../views/FeestatisticView.vue"
import AnswerView from "../views/AnswerView.vue"
import ReviseView from "../views/ReviseView.vue"
import CheckDetailView from "../views/DetailView.vue"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        children: [
            { path: '/login', name: 'login', component: LoginView },
            { path: '/signup', name: 'signup', component: SignupView },
            { path: '/info', name: 'userInfo', component: InfoView },
            { path: '/publish', name: 'publish', component: PublishView },
            { path: '/publishedList', name: 'publishedList', component: PublishedlistView },
            { path: '/allRequests', name: 'allRequests', component: RequestView },
            { path: '/responsed', name: 'responsed', component: ResponsedView },
            { path: '/localFlavor', name: 'localFlavor', component: LocalflavorView },
            { path: '/myComments', name: 'myComments', component: CommentsView },
            { path: '/tRevise', name: 'tRevise', component: TRevisedView },
            { path: '/statistic', name: 'statistic', component: StatisticView },
            { path: '/searchFlavor', name: 'searchFlavor', component: SearchflavorView },
            { path: '/recievedMsg', name: 'recievedMsg', component: RecievedmsgView },
            { path: '/feeStatistic', name: 'feeStatistic', component: FeestatisticView },
            { path: '/answer', name: 'answerView', component: AnswerView },
            { path: '/reviseAnswer', name: 'reviseAnswer', component: ReviseView },
            { path: '/checkDetail', name: 'checkDetail', component: CheckDetailView }
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
