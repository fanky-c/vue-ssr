import tooltip from './tooltip'
import toast from './toast'
import loading from './loading'

export default {
	install: function(Vue) {
		tooltip.install(Vue);
		toast.install(Vue);
		loading.install(Vue);
	}
}