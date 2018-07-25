import domready from 'domready'

export const elemsToWatch = []

const start = ( el, opts = {} ) => {
    stop( el )
    const options = Object.assign( 
        { callback: () => {} },
        opts
    )

    elemsToWatch.push( { el, options, } )
    if ( isInView( el, options ) ) {
        options.callback()
        stop( el )
    }
}

const stop = ( el ) => {
    elemsToWatch.forEach( ( { el: existingEl }, i ) => {
        if ( existingEl === el ) {
            elemsToWatch.splice( i, 1 )
        }
    } )
}

export const isInView = ( el, options ) => {
    const scroll = window.scrollY || window.pageYOffset
    const boundsTop = el.getBoundingClientRect().top + scroll
    
    const viewport = {
        top: scroll,
        bottom: scroll + window.innerHeight,
    }
    
    const bounds = {
        top: boundsTop,
        bottom: boundsTop + el.clientHeight,
    }
    
    return ( bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom ) 
        || ( bounds.top <= viewport.bottom && bounds.top >= viewport.top );
}

const raf = 
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function( callback ) {
        window.setTimeout( callback, 1000 / 60 )
    }

export const scrollHandler = () => {
    elemsToWatch.forEach( ( { el, options } ) => {
        if ( isInView( el, options ) ) {
            options.callback()
            stop( el )
        }
    } )
}

export default {
    start,
    stop,
} 

domready( () => {
    const handler = () => raf( scrollHandler )
    handler()
    window.addEventListener( 'scroll', handler )
    window.addEventListener( 'resize', handler )
} )