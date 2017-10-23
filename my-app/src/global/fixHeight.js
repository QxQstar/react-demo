import $ from 'jquery'
function fixHeight(config = {}) {
    return $(window).height() - (config.offset || 0 );
}
export default fixHeight;