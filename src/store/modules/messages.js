const state = {
    required: 'xanası doldurulmalıdır!',
    failed: "Əməliyyat uğursuz oldu!",
    success:'Əməliyyat uğurlu oldu!',
    numeric: 'Xahiş olunur ədəd daxil edin',
    noRecordFound: "Məlumat yoxdur!",
    updated: 'uğurla yeniləndi!',
    created: 'uğurla yaradıldı!',
    deleted: 'uğurla silindi!',
  
    tasks:{
      noneApplied: "Tapşırığa heç kim müraciət etməyib!",
      deadline: "Düzgün vaxt daxil edin!",
    },

    auth:{
      incorrectCredentials: "Email yaxud şifrə yalnışdır!",
    },

};

const getters = {
  auth(state){
    return state.auth;
  },

  tasks(state){
    return state.tasks;
  },

  all(state){
    return state;
  }
};

const mutations = {};

const actions = {};

export default {
  namespaced:true,
  state,
  mutations,
  actions,
  getters,
};
