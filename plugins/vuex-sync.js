export default ({ store }) => {
    let lastSaved = {}
    let timer = null
    let queue = []

    async function saveChar(char) {

        if (process.client && !navigator.onLine) {
            queue.push(char)
            return
        }

        await app.$supabase
            .from('Character')
            .update({
                data: char,
                updated_at: new Date()
            })
            .eq('character_id', char.id)
    }

    async function flushQueue() {
        for (const char of queue) {
            await saveChar(char)
        }
        queue = []
    }
    if (process.client) {
        window.addEventListener('online', flushQueue)
    }

    store.subscribe((mutation, state) => {

        // фильтруем только изменения персонажа
        if (!mutation.type.startsWith('characters/')) return

        clearTimeout(timer)

        timer = setTimeout(async () => {

            const chars = Object.values(state.characters.characters)


            const char = state.characters.characters[state.characters.activeId]
            const charString = JSON.stringify(char)

            if (!char) return
            if (lastSaved[char.id] === charString) {
                return // ❌ ничего не изменилось
            }


            if (!char.isMarked) return

            lastSaved[char.id] = charString

            await store.$supabase
                .from('Character')
                .update({
                    data: char,
                    updated_at: new Date().toISOString()
                })
                .eq('character_id', char.id)




        }, 800)
    })
}