import { formSettings } from '../util'
import BigPicture from 'bigpicture'

const start = ( el, options = {} ) => {

    const defaults = {
        video: '',
    }

    const settings = formSettings( el, defaults, options )
    
    stop( el );

    el._videoPopupHandler = ev => {
        ev.preventDefault()
        openVideo( el, settings.video )
    }
    el.addEventListener( 'click', el._videoPopupHandler )
}

const stop = ( el ) => {
    if ( el._videoPopupHandler ) {
        el.removeEventListener( 'click', el._videoPopupHandler )
    }
}

export default {
    start,
    stop,
}

export const getVideoType = ( videoID ) => {
    if ( videoID.match( /^\d+$/g ) ) {
        return 'vimeo'
    } else if ( videoID.match( /^https?:\/\//g ) ) {
        return 'url'
    } else {
        return 'youtube'
    }
}

export const openVideo = ( el, videoID ) => {
    const args = {
        el,
        noLoader: true,
    }
    if ( Array.isArray( videoID ) ) {
        args['vidSrc'] = videoID
    } else {
        const type = getVideoType( videoID )
        if ( type === 'vimeo' ) {
            args['vimeoSrc'] = videoID
        } else if ( type === 'youtube' ) {
            args['ytSrc'] = videoID
        } else {
            args['vidSrc'] = videoID
        }
    }
    BigPicture( args )
}