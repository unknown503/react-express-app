import React, { useCallback, useContext, useEffect, useState } from 'react'
import Quill from "quill"
import "./Editor.css"
import "quill/dist/quill.snow.css"
import toast, { Toaster } from 'react-hot-toast';
import { getNotepad, handleNotepad } from '../../api/Requests'
import { AuthContext } from '../../Context/AuthContext'

const SAVE_INTERVAL_MS = 5000
const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
]

export default function Editor() {
    const [quill, setQuill] = useState()
    const [saved, setsaved] = useState(false)
    const { user } = useContext(AuthContext);
    const { id } = user.result
    const { token } = user

    const timer = useCallback(
        () => {
            if (saved) {
                setTimeout(() => {
                    handleNotepad(id, quill.getContents(), token).then(res => {
                        if (res.data.response) {
                            toast.success('Saved document.', {
                                position: 'bottom-right',
                            });
                            setsaved(false)
                        }
                    })
                }, SAVE_INTERVAL_MS)
            }
        },
        [saved, quill, id, token],
    )

    useEffect(() => {
        if (quill === undefined) return
            quill.on('text-change', function (delta, oldDelta, source) {
                if (source !== "user") return
                setsaved(true)
            })

    }, [quill])

    useEffect(() => {
        timer()
    }, [saved, quill, id, token, timer])

    useEffect(() => {
        if (quill === undefined) return
        quill.enable()
    }, [quill])

    useEffect(() => {
        if (quill === undefined) return
        getNotepad(id, token).then(res => {
            if (res.data.error) {
                toast.error(res.data.message, {
                    position: 'bottom-right',
                });
            } else {
                quill.updateContents(res.data.content)
            }
        })
    }, [id, token, quill])

    const wrapperRef = useCallback(wrapper => {
        if (wrapper == null) return

        wrapper.innerHTML = ""
        const editor = document.createElement("div")
        wrapper.append(editor)
        const q = new Quill(editor, {
            theme: "snow",
            modules: { toolbar: TOOLBAR_OPTIONS },
        })

        q.disable()
        q.setContents("")
        setQuill(q)
    }, [])

    return (
        <>
            <div className="container">
                <div ref={wrapperRef}></div>
            </div>
            <Toaster />
        </>
    )
}