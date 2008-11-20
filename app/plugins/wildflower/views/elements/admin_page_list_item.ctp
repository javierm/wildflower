<div class="list-item">
<?php
	
	$dom_id = 'page-' . $data['WildPage']['id'];

    $tree->addItemAttribute('id', $dom_id);
    $tree->addItemAttribute('class', 'level-' . $depth);
    if (ListHelper::isOdd()) {
        $tree->addItemAttribute('class', 'odd');
    }
    echo $html->link($data['WildPage']['title'], array('action' => 'edit', 'id' => $data['WildPage']['id']),
            array('title' => __('Edit', true))); 
    if ($data['WildPage']['draft']) {
        echo '<small class="draft-status">' . __('Draft', true) . '</small>';
    }

    $action = 'wf_move_tree_element';
    
	echo $form->create( 'WildPage',
		array(
		'action'=> $action,
		'id'	=> 'Page' . Inflector::camelize($action) . '-' . $data['WildPage']['id'])
	);
	
	
	echo '<div style="display:none">' . $form->hidden('dom_id',
		array(
			'id' => "Page-dom_id-$dom_id",
			'value' => $dom_id,
			'name' => 'data[dom_id]'
		)
	) . "</div>";
	
	echo $form->submit( '▲',
		array(
			'class'	=> 'move-up',
			'title'	=> __('Move up', true),
			'name'	=> 'data[number]'
		)
	);
	echo $form->submit( '▼',
		array(
			'class'	=> 'move-down',
			'title'	=> __('Move down', true),
			'name'	=> 'data[number]'
		)
	);	
	echo $form->end();
?>	
</div>
