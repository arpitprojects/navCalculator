import examples from './components/Examples.vue';
import dashboard from './components/Dashboard.vue';

export const routes = [
    
    {path : '/' , component : dashboard},
    {path : '/example' , component : examples },
    {path : '*' , redirect : '/'}
];