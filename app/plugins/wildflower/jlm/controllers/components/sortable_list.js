$.jlm.addComponent('sortable_list', {

    startup: function() {
        var start;
    
        function reorder_elements(){
            $("ul.list, ul.list ul").sortable( {
                start: start_index,
                stop: stop_index 
            });
        
            $('.list-item .move-up, .list-item .move-down').click(function() {
                move_item($(this).parent().parent().parent().parent(), this.value,
                           $(this).attr('class'));
                return false;
            });
        }
    
        function start_index(e, ui) {
            start = get_index(ui);
        }

        function stop_index(e, ui ) {
            var stop = get_index(ui);
            var number = stop - start;
            update_tree(ui.item, number);
        }

        function update_tree(list_item, number) {
            var id = list_item.attr('id');
            var url = $.jlm.base + '/' + $.jlm.params.prefix + '/' + $.jlm.params.controller.replace('wild_', '') + '/move_tree_element';  
            $.post( url, {'data[dom_id]': id, 'data[number]': number});
            reassign_odd_class();
        }

        function get_index(ui) {
            var list_item = ui.item;
            var index = list_item.parent().children().index(list_item); 
            return index;   
        }

        function move_item(list_item, number, class) {
            //TODO: a bit of duplication here
            if( class == 'move-down' ) {
                list_item.fadeOut('slow', function() {
                    $(this).insertAfter($(this).next()).fadeIn('slow');
                    reassign_odd_class();
                });
            } else {
                list_item.fadeOut('slow', function() {
                    $(this).insertBefore($(this).prev()).fadeIn('slow');
                    reassign_odd_class();
                });
            }
            update_tree(list_item, number);
        }

        //TODO: same code as list component.
        function reassign_odd_class() {
            var j = 0;
            $('ul.selectable-list li').each(function() {
                var liEl = $(this);
                liEl.removeClass('odd');
                if (j % 2 == 0) {
                    liEl.addClass('odd');
                }
                j++;
            });
        }
        reorder_elements();
    }
});
