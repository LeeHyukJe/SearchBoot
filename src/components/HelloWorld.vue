<template>
  <v-layout 
    row wrap pt-5 text-xs-center 
    style="max-width:500px;margin:0 auto;"
    >
    <v-btn @click="searchBbs">게시판</v-btn>
    <v-btn @click="searchApp">전자결재</v-btn>
    <v-flex xs12>
          <v-text-field
            v-model="userId"
            label="검색어를 입력하세요"
          ></v-text-field>
          <v-btn @click="search">검색</v-btn>
    </v-flex>
    <v-flex xs12>
       <div v-if="results">
             <div v-for="result in results" :key="result">
               <p>{{result.RealColName}}검색 결과 갯수{{result.eachCount}}</p>
               <p>{{result.DOCID}}</p>
               <p v-html="result.FIELD_SUBJECT"></p>
               <p>{{result.FIELD_OWNER_NAME}}</p>
               <hr>
            </div>    
       </div>
       <div v-else>
         검색 결과가 없습니다. 다른 검색어로 검색해 주세요
       </div>
    </v-flex>
</v-layout>
</template>

<script>
import axios from 'axios'
  export default {
   data(){
     return{
       results:[],
       userId:''
     }
   }
   ,
    mounted(){
      axios
        .get('/searchAll')
        .then((res)=>{
          if(res.data.app.length>0 || res.data.bbs.length>0){
          let resultList=res.data.bbs
          let concatList=resultList.concat(res.data.app)
          this.results=concatList
          console.log(this.results)
          }
          else{
            this.results=null
          }

        })
    },
    methods:{
      search(){
        axios
        .get('/searchAll?query='+this.userId)
        .then((res)=>{
          if(res.data.bbs.length>0 || res.data.app.length>0){
          let appResult = res.data.app
          let bbsResult = res.data.bbs
          let totalResult = appResult.concat(bbsResult)
          this.results=totalResult
          console.log(res)
          }
          else{
            this.results=null
          }
        })
      },
      searchBbs(){
        axios
        .get('/search/collection?collection=bbs&query='+this.userId)
        .then((res)=>{
          if(res.data.length>0){
          this.results=res.data
          console.log(this.results)
          }
          else{
            this.results=null
          }
        })
        .catch((err)=>{
          console.log(err)
        })
      },
      searchApp(){
        axios
        .get('/search/collection?collection=app&query='+this.userId)
        .then((res)=>{
          if(res.data.length>0){
          this.results=res.data
          console.log(this.results)
          }
          else{
            this.results=null
          }
        })
        .catch((err)=>{
          console.log(err)
        })
      }
    }
  }
</script>

<style>

</style>
