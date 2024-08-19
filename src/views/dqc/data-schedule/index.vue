<template>
  <div>
    <PageWrapper title="数据调度">
    </PageWrapper>

    <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
    >
      <a-button type="success">Show</a-button>
      <a-alert
        v-if="visible"
        message='Alert Message Text'
        type="success"
        closable
      />
    </a-layout-content>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import {PageWrapper} from '/@/components/Page'

export default defineComponent({
  components: {PageWrapper},
  setup() {
    return {
      visible: ref(true)
    }
  },
})
</script>
