<template>
  <div id="app">
    <router-view />
<!--    <vue-tinymce-->
<!--      v-model="content"-->
<!--      :setting="setting" />-->

  </div>
</template>

<script>
export default {
  name: 'App',
  // data(){
  //   return {
  //     content: '',
  //     setting: {
  //       menubar: false,
  //       toolbar: "undo redo | fullscreen | formatselect alignleft aligncenter alignright alignjustify | link unlink | numlist bullist | image media table | fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |",
  //       toolbar_drawer: "sliding",
  //       quickbars_selection_toolbar: "removeformat | bold italic underline strikethrough | fontsizeselect forecolor backcolor",
  //       plugins: "link image media table lists fullscreen quickbars",
  //       language: 'zh_CN', //本地化设置
  //       height: 350
  //     }
  //   }
  // }
}
</script>
