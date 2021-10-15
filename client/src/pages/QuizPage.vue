<template>
  <div class="quiz-page">
    <h1 class="point">1000</h1>
    <div class="container">
      <div class="code-block"></div>
      <div class="ans-container">
        <Button code="Python"/>
        <Button code="C++"/>
        <Button code="Golang"/>
        <Button code="Elixir"/>
      </div>
      <div class='next-container'>
        <button type="submit" class="next-btn">
          Next
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '../components/Button.vue'

export default {
  name: "QuizPage",
  components: {
    Button
  }
}
</script>

<style scoped>
.quiz-page {
  margin: 2em 10em;
} 
.point {
  font-size: 2.5em;
  text-align: center;
}
.container {
  padding-inline: 16em;
}
.code-block {
  background-color: #C4C4C4;
  height: 21em;
}
.ans-container {
  padding-block: 15px;
  display: flex;
  justify-content: space-between;
}
.next-container {
  display: flex;
  justify-content: flex-end;
}
.next-btn {
  border: 1px solid black;
  padding: 14px;
  width: 8em;
  border-radius: 10px;
  font-size: 20px;
}
.next-btn i {
  padding: 5px;
}
.next-btn:hover {
  background-color: #c4c4c4;
}
</style>

