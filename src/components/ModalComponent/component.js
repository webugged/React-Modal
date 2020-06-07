import React, { useCallback, useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { isFunction } from '../../helpers/isFunction'
import './styles.css'

const ModalComponent = ({ renderTrigger, children, beforeClose, ...props}) => {
    const modalRef = useRef(null)
    const [isOpen, setOpen] = useState(false)
    const open = useCallback(() => setOpen(true), [setOpen])
    const close = useCallback(() => {
        if (beforeClose && isFunction(beforeClose)) {
            beforeClose()
        }
        setOpen(false)
    }, [setOpen, beforeClose])


    const handleClick = useCallback(e => {
        if (isOpen && modalRef.current && !modalRef.current.contains(e.target)) {
            close()
        }
    }, [close, isOpen])

    useEffect(() => {
        document.addEventListener('click', handleClick)
        return () =>  document.removeEventListener("click", handleClick)
    }, [handleClick])

    return (
        <div>
            {renderTrigger(open, close)}
            {isOpen && (
                <div className="modalContainer"  styles={{display: isOpen}}>
                    <div ref={modalRef} className="modalContent" onClick={handleClick}>
                        {isFunction(children) ? children(props, close ) : React.Children.map(
                            children,
                            child => React.cloneElement(child, { ...props })
                            )
                        }
                    </div>
                </div>
                )
            }
        </div>
    )
}

ModalComponent.propTypes = {
    children: PropTypes.any,
    renderTrigger: PropTypes.func,
    beforeClose: PropTypes.func,
    props: PropTypes.shape({})
}

export default ModalComponent
