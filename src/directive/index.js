import tooltip from './tooltip'
import toast from './toast'

export default {
	install: function(Vue) {
		tooltip.install(Vue);
		toast.install(Vue);
	}
}