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
  border: 1px solid #00ADB5;
  padding: 15px;
  width: 6.5em;
  border-radius: 10px;
  transition: .2s ease-in;
}
.ans-btn:hover {
  background-color: #00ADB535;
}
</style>