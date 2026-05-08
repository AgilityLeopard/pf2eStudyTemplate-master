import { Node, mergeAttributes } from '@tiptap/core'

export const ActionIcon = Node.create({
    name: 'actionIcon',

    inline: true,
    group: 'inline',
    atom: true,

    addAttributes() {
        return {
            type: {
                default: '1',
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'span[data-action-icon]',
                getAttrs: element => {
                    return {
                        type: element.getAttribute('data-action-icon'),
                    }
                },
            },
        ]
    },

    renderHTML({ node }) {
        const type = node.attrs.type

        const srcMap = {
            '1': '/img/icon/action_single.png',
            '2': '/img/icon/action_double.png',
            '3': '/img/icon/action_triple.png',
            'reaction': '/img/icon/action_reaction.png',
            'free': '/img/icon/action_free.png',
        }

        return [
            'span',
            { 'data-action-icon': type },
            [
                'img',
                {
                    src: srcMap[type],
                    class: 'action-icon', // 👈 ВОТ СЮДА
                },
            ],
        ]
    },

    addCommands() {
        return {
            insertActionIcon:
                type =>
                    ({ commands }) => {
                        return commands.insertContent({
                            type: this.name,
                            attrs: { type },
                        })
                    },
        }
    },
})