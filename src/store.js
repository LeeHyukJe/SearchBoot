import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router.js'

Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        totalSearchResult: null
            // { "DOCID": "BA7683772802482687928", "FIELD_SUBJECT": "testQR", "RealColName": "게시판", "FIELD_CONTENT": "test입니다.test입니다.test입니다.\n\ntest입니다.\n\ntest입니다.test입니다.\n\ntest입니다.\n\ntest입니다.\n\ntest입니다.\n\ntest입니다.\n\ntest입니...", "eachCount": 3, "FIELD_OWNER_NAME": "관리자" }, { "DOCID": "BA35713841580070932919", "FIELD_SUBJECT": "세검정성당 사무원 모집(추천)", "RealColName": "게시판", "FIELD_CONTENT": "◉ 세검정성당 사무원 모집 ◉\n\n- 대상: 세례 받은지 3년 이상\n\n- 자격: 사무행정, 회계업무 및 PC(한글, 엑셀 등) 사용 가능자\n\n- 서류: 이력서, 자기소개서, 교적사본...", "eachCount": 3, "FIELD_OWNER_NAME": "김학렬" }, { "DOCID": "BA3571325681971312913", "FIELD_SUBJECT": "갈현동 성당 관리인(계약직) 모집", "RealColName": "게시판", "FIELD_CONTENT": "- 관리인(계약직)을 모집합니다.\n\n자격 : 세례 받은지 3년 이상, 건강하신 분\n\n제출서류 : 이력서, 교적사본, 주임신부님 추천서\n\n전형 : 서류 심사, 면접(개별 연락)\n...", "eachCount": 3, "FIELD_OWNER_NAME": "권미영" }, { "DOCID": "BA7683772802482687928", "AUTH_ID": "BB7481829111984442805", "FIELD_SUBJECT": "testQR", "RealColName": "전자결재", "FIELD_CONTENT": "test입니다.test입니다.test입니다.\n\ntest입니다.\n\ntest입니다.test입니다.\n\ntest입니다.\n\ntest입니다.\n\ntest입니다.\n\ntest입니다.\n\ntest입니...", "eachCount": 3, "FIELD_OWNER_NAME": "관리자" }, { "DOCID": "BA35713841580070932919", "AUTH_ID": "BBNC126181127", "FIELD_SUBJECT": "세검정성당 사무원 모집(추천)", "RealColName": "전자결재", "FIELD_CONTENT": "◉ 세검정성당 사무원 모집 ◉\n\n- 대상: 세례 받은지 3년 이상\n\n- 자격: 사무행정, 회계업무 및 PC(한글, 엑셀 등) 사용 가능자\n\n- 서류: 이력서, 자기소개서, 교적사본...", "eachCount": 3, "FIELD_OWNER_NAME": "김학렬" }, { "DOCID": "BA3571325681971312913", "AUTH_ID": "BBNC126181127", "FIELD_SUBJECT": "갈현동 성당 관리인(계약직) 모집", "RealColName": "전자결재", "FIELD_CONTENT": "- 관리인(계약직)을 모집합니다.\n\n자격 : 세례 받은지 3년 이상, 건강하신 분\n\n제출서류 : 이력서, 교적사본, 주임신부님 추천서\n\n전형 : 서류 심사, 면접(개별 연락)\n...", "eachCount": 3, "FIELD_OWNER_NAME": "권미영" }
            ,
        bbsSearchResult: null,
        appSearchResult: null,
        access_token: null

    },
    mutations: {
        getSearchResults: (state, payload) => {
            state.totalSearchResult = payload
                //console.log(state.searchResult)
        },
        getBoardSearchResult: (state, payload) => {
            state.bbsSearchResult = payload
        },
        getAppSearchResult: (state, payload) => {
            state.appSearchResult = payload
        },
        setAccessToken: (state, payload) => {
            state.access_token = payload
        }
    },
    actions: {
        totalSearchResults: ({ commit }, params) => {
            if (!params) {
                axios
                    .get('/searchAll')
                    .then((res) => {
                        let appResult = res.data.app
                        let bbsResult = res.data.bbs
                        let totoalResult = bbsResult.concat(appResult)
                        commit('getSearchResults', totoalResult)
                    })
            } else {
                axios
                    .get('/searchAll?query=' + params)
                    .then((res) => {
                        let appResult = res.data.app
                        let bbsResult = res.data.bbs
                        let totoalResult = bbsResult.concat(appResult)
                        commit('getSearchResults', totoalResult)
                    })
            }

        },
        boardSearchResult: ({ commit }, params) => {
            if (!params.keyword) {
                axios
                    .get('/search/collection?collection=' + params.collection)
                    .then((res) => {
                        commit('getBoardSearchResult', res.data)
                    })
            } else {
                axios
                    .get('/search/collection?collection=' + params.collection + '&query=' + params.keyword)
                    .then((res) => {
                        commit('getBoardSearchResult', res.data)
                    })
            }

        },
        appSearchResult: ({ commit }, params) => {
            if (!params.keyword) {
                axios
                    .get('/search/collection?collection=' + params.collection)
                    .then((res) => {
                        commit('getAppSearchResult', res.data)
                    })
            } else {
                axios
                    .get('/search/collection?collection=' + params.collection + '&query=' + params.keyword)
                    .then((res) => {
                        commit('getAppSearchResult', res.data)
                    })
            }

        },

        access_token_action: ({ commit }, params) => {
            axios.post('/secure/login', params)
                .then((res) => {
                    console.log("로그인 전송 완료!")
                    console.log(res)
                    commit('setAccessToken', res.data.access_token)
                    router.push({ name: 'search' })
                })
                .catch((err) => {
                    console.log(err)
                    alert('비밀번호 및 아이디를 확인해 주세요')
                })
        }
    }
})