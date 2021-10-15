<template>
  <button type="submit" class='ans-btn'>
    {{code}}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    code: String
  }
}
</script>

<style scoped>
.ans-btn {
  border: 1px solid black;
  padding: 15px;
  width: 7em;
  border-radius: 10px;
}
.ans-btn:hover {
  background-color: #c4c4c4;
}
</style>