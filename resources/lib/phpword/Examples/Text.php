<?php
require_once '../PHPWord.php';

// New Word Document
$PHPWord = new PHPWord();

// New portrait section
$section = $PHPWord->createSection();

// Add text elements
$section->addText('Hello World!');
$section->addTextBreak(2);

$section->addText('Una Linea con estilo.', array('name'=>'Tahoma', 'color'=>'000099'));
$section->addTextBreak(2);
$empleado='PAblo';
$PHPWord->addFontStyle('rStyle', array('bold'=>true, 'italic'=>true, 'size'=>16));
$PHPWord->addParagraphStyle('pStyle', array('align'=>'center', 'spaceAfter'=>100));
$section->addText('I am styled by two style definitions.', 'rStyle', 'pStyle');
$section->addText('I have only a paragraph style definition.', null, 'pStyle');



// Save File
$objWriter = PHPWord_IOFactory::createWriter($PHPWord, 'Word2007');

$objWriter->save('Textos.docx');
//print_r($objWriter);

?>