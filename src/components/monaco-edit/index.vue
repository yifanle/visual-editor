<template>
    <div class="monaco" ref="monacoRef"></div>
</template>
<script setup lang="ts" name="MonacoEdit">
import { PropType, ref, nextTick, computed, watch } from 'vue';
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
const readonly = computed(() => props.readonly);
const code = computed(() => props.code);
const init = () => {
    if (monacoRef.value) {
        editor = monaco.editor.create(monacoRef.value, {
            language: props.language,
            automaticLayout: true,
            roundedSelection: true,
            scrollBeyondLastLine: true,
            readOnly: props.readonly,
            theme: 'vs'
        });
        if (props.readonly) {
            editor.setValue(checkJsonCode(props.code));
        } else {
            editor.setValue(props.code);
            editor.getAction('editor.action.formatDocument')?.run();//自动格式化代码
            editor.setValue(editor.getValue());//再次设置
            // value = props.code
        }
        editor.onDidChangeModelContent((e) => {
            emit('onDidChangeModelContent', editor.getValue());
        })
    }
}
watch(code, (newVal, oldVal) => {
    if (editor&&props.readonly) {
        editor.dispose();
        nextTick(init);
    }
})

watch(readonly, (newVal, oldVal) => {
    if (editor) {
        editor.updateOptions({
            readOnly: newVal
        })
    }
})
nextTick(init);
const checkJsonCode = (strJsonCode: string) => {
    let res = '';
    try {
        for (let i = 0, j = 0, k = 0, ii, ele; i < strJsonCode.length; i++) {
            ele = strJsonCode.charAt(i);
            if (j % 2 === 0 && ele === '}') {
                k--;
                for (ii = 0; ii < k; ii++) ele = `    ${ele}`;
                ele = `\n${ele}`;
            } else if (j % 2 === 0 && ele === '{') {
                ele += '\n';
                k++;
                for (ii = 0; ii < k; ii++) ele += '    ';
            } else if (j % 2 === 0 && ele === ',') {
                ele += '\n';
                for (ii = 0; ii < k; ii++) ele += '    ';
            } else if (ele === '"') j++;
            res += ele;
        }
    } catch (error) {
        res = strJsonCode;
    }
    return res;
}

const disposeEdit = () => {
    editor.dispose();
}
defineExpose({
    disposeEdit
})
</script>
<style scoped lang="scss">
.monaco {
    height: 400px;
    border: 2px solid var(--materials-color);
}
</style>
