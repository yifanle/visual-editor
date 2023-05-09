<template>
    <div class="monaco" ref="monacoRef"></div>
</template>
<script setup lang="ts" name="MonacoEdit">
import { PropType, ref, nextTick } from 'vue';
import monaco from './customMonaco';
import { IMonacoLanguage } from './model/model';
const props = defineProps({
    code: {
        type: String,
        default: ''
    },
    readonly: {
        type: Boolean,
        default: false
    },
    language: {
        type: String as PropType<IMonacoLanguage>,
        default: IMonacoLanguage.TypeScript
    }
});
const emit = defineEmits(['onDidChangeModelContent']);
const monacoRef = ref<HTMLElement | null>(null);
let editor: monaco.editor.IStandaloneCodeEditor;
nextTick(() => {
    if (monacoRef.value) {
        editor = monaco.editor.create(monacoRef.value, {
            value: props.code,
            language: props.language,
            automaticLayout: true,
            roundedSelection: true,
            scrollBeyondLastLine: true,
            readOnly: props.readonly,
            theme: 'vs-dark'
        });
        editor.onDidChangeModelContent((e) => {
            emit('onDidChangeModelContent', editor.getValue());
        })
    }
});
const disposeEdit = () => {
    editor.dispose();
}
defineExpose({
    disposeEdit
})
</script>
<style scoped lang="scss">
</style>
