import store from '@/store';
import axios from 'axios';

store.subscribe((mutation)=>{
    switch(mutation.type){
        case 'user/SET_TOKEN':
            if(mutation.payload){
                axios.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload}`;
                localStorage.setItem('id_token', mutation.payload);   
            }else{
                axios.defaults.headers.common['Authorization'] = null;
                localStorage.removeItem('id_token');      
            }
        break;
    }
});