class StickyNavigation {
	constructor() {
		this.currentId = null;
		this.currentTab = null;
		this.tabContainerHeight = 70;
		$(".hero-tab").click((event) => {
			this.onTabClick(event, $(event.target));
		});
		$(window).scroll(() => {
			this.onScroll();
		});
		$(window).resize(() => {
			this.onResize();
		});
		this.setSliderCss();
	}

	onTabClick(event, element) {
		event.preventDefault();
		let isHomeTab = element.attr("href") === "#tab-home";
		$(".hero-tab").removeClass("active");
		if (!isHomeTab) {
			element.addClass("active");
		}
		let scrollTop = isHomeTab
			? 0
			: $(element.attr("href")).offset().top - this.tabContainerHeight + 1;
		$("html, body").animate({ scrollTop: scrollTop }, 600);
	}

	onScroll() {
		this.checkTabContainerPosition();
		this.findCurrentTabSelector();
		this.setSliderCss();
	}

	onResize() {
		if (this.currentId) {
			this.setSliderCss();
		}
	}

	checkTabContainerPosition() {
		let offset =
			$(".hero-tabs").offset().top +
			$(".hero-tabs").height() -
			this.tabContainerHeight;
		if ($(window).scrollTop() > offset) {
			$(".hero-tabs-container").addClass("hero-tabs-container--top");
		} else {
			$(".hero-tabs-container").removeClass("hero-tabs-container--top");
		}
	}

	findCurrentTabSelector() {
		let newCurrentId = null;
		let newCurrentTab = null;
		$(".hero-tab").each(function () {
			let id = $(this).attr("href");
			let offsetTop = $(id).offset().top - this.tabContainerHeight;
			let offsetBottom =
				$(id).offset().top + $(id).height() - this.tabContainerHeight;
			if (
				$(window).scrollTop() >= offsetTop &&
				$(window).scrollTop() < offsetBottom
			) {
				newCurrentId = id;
				newCurrentTab = $(this);
			}
		});

		if (
			newCurrentId &&
			(this.currentId !== newCurrentId || this.currentId === null)
		) {
			$(".hero-tab").removeClass("active");
			this.currentId = newCurrentId;
			this.currentTab = newCurrentTab;
			this.currentTab.addClass("active");
		}
	}

	setSliderCss() {
		let width = 0;
		let left = 0;
		if (this.currentTab) {
			width = this.currentTab.css("width");
			left = this.currentTab.offset().left;
		}
		$(".hero-tab-slider").css("width", width);
		$(".hero-tab-slider").css("left", left);
	}
}

$(document).ready(function () {
	new StickyNavigation();
});
