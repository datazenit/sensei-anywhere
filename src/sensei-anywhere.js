(function ($) {

    function match(search, text) {
        search = search.toUpperCase();
        text = text.toUpperCase();

        var j = -1;

        for (var i = 0; i < search.length; i++) {
            var l = search[i];
            if (l == ' ') continue;

            j = text.indexOf(l, j + 1);
            if (j == -1) return false;
        }
        return true;
    }

    $.anywhere = function (data, shortcuts, limitPerGroup) {

        // default value for limitPerGroup setting
        limitPerGroup = limitPerGroup || 5;

        var plugin = this;
        plugin.data = [];
        plugin.lastSet = [];
        plugin.isActive = false;

        plugin.events = {_events: {}};
        plugin.on = plugin.events.on = function (event, callback, context) {
            if (!_.has(this._events, event)) {
                this._events[event] = [];
            }
            this._events[event].push({callback: callback, context: context});
        };
        plugin.events.trigger = function (event) {
            var args = Array.prototype.slice.call(arguments, 1);
            if (_.has(this._events, event)) {
                var events = this._events[event];
                _.each(events, function (e) {
                    console.log("trigger event", event, e);
                    var cbk = _.bind(e["callback"], e["context"]);
                    cbk.apply(this, args);
                });
            }
        };
        plugin.events.off = function (event) {
            if (_.has(this._events, event)) {
                delete this._events[event];
            }
        };

        plugin.showSearchBox = function () {
            plugin.isActive = true;
            $(".sensei-anywhere").toggle();
            var $input = $(".sensei-anywhere input");
            $input.focus();
            plugin.updateResults($input.val().trim());
            plugin.events.trigger("show");
        };

        plugin.hideSearchBox = function () {
            $(".sensei-anywhere").hide();
            plugin.isActive = false;
            plugin.events.trigger("close");
        };

        plugin.updateResults = function (term) {

            var head;
            var group_size = limitPerGroup;
            var $wrapper = $(".sensei-anywhere .sensei-anywhere-list");
            $wrapper.html("");

            _.each(plugin.data, function (group) {

                if (term) {
                    head = _.filter(group.items, function (item) {
                        return match(term, item);
                    });
                } else {
                    head = group.items;
                }

                if (head.length > 0) {
                    var $li = $("<li>").addClass("item-group").text(group.group);
                    $wrapper.append($li);

                    _.each(head.slice(0, group_size), function (item) {
                        $wrapper.append($("<li>").addClass("item").text(item));
                    });
                }

            });

            $(".sensei-anywhere .sensei-anywhere-list li.item:first").addClass("active");
        };

        plugin.moveActiveItemUp = function () {
            var $curr = $(".sensei-anywhere .sensei-anywhere-list li.item.active");
            $curr.removeClass("active");
            if ($curr.prevAll("li.item").length > 0) {
                var $item = $curr.prevAll("li.item").first().addClass("active");
            } else {
                var $item = $(".sensei-anywhere .sensei-anywhere-list li.item:last").addClass("active");
            }
            plugin.events.trigger("highlight", $item.text());
        };

        plugin.moveActiveItemDown = function () {
            var $curr = $(".sensei-anywhere .sensei-anywhere-list li.item.active");
            $curr.removeClass("active");
            if ($curr.nextAll("li.item").length > 0) {
                var $item = $curr.nextAll("li.item").first().addClass("active");
            } else {
                var $item = $(".sensei-anywhere .sensei-anywhere-list li.item:first").addClass("active");
            }
            plugin.events.trigger("highlight", $item.text());
        };

        plugin.chooseItem = function () {
            var item = $(".sensei-anywhere .sensei-anywhere-list li.item.active").text();
            plugin.hideSearchBox();
            plugin.events.trigger("select", item);
        };

        plugin.init = function (data, shortcuts) {
            plugin.data = data;
            Mousetrap.bind(shortcuts, plugin.showSearchBox);
            Mousetrap.bind(["esc"], function (e) {
                if (plugin.isActive) {
                    e.preventDefault();
                    plugin.hideSearchBox();
                }
            });
            Mousetrap.bind(["up", "shift+tab"], function (e) {
                if (plugin.isActive) {
                    e.preventDefault();
                    plugin.moveActiveItemUp();
                }
            });
            Mousetrap.bind(["down", "tab"], function (e) {
                if (plugin.isActive) {
                    e.preventDefault();
                    plugin.moveActiveItemDown();
                }
            });
            Mousetrap.bind(["enter"], function (e) {
                if (plugin.isActive) {
                    e.preventDefault();
                    plugin.chooseItem();
                }
            });
            $(".sensei-anywhere input").on("keyup", function (e) {
                var usedKeyCodes = [9, 13, 38, 40];
                if (!_.contains(usedKeyCodes, e.which)) {
                    var term = $(this).val().trim();
                    plugin.updateResults(term);
                }
            });
            $(".sensei-anywhere .sensei-anywhere-list").on("click", "li.item", function (e) {
                e.preventDefault();
                console.log($(this));
                $(this).addClass("active").siblings().removeClass("active");
                plugin.chooseItem();
            });
            plugin.events.trigger("init");
            return plugin;
        };

        return plugin.init(data, shortcuts);

    }

})(jQuery);