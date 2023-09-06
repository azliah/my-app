<template>
  <div>
    <p class="title">{{ booktitle }}</p>
    <p class="details">Author: {{ author }}</p>
    <p class="details">Price: RM{{ price }}</p>
  </div>
</template>

<script>
export default {
  props: {
    booktitle: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }
};
</script>
