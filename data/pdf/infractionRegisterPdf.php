<?php

require_once('../tcpdf/config/lang/eng.php');
require_once('../tcpdf/tcpdf.php');
require_once("../dbConnection.php");

// extend TCPF with custom functions
class MYPDF extends TCPDF {

	// Load table data from file
	public function LoadData($file) {
		// Read file lines
		$lines = file($file);
		$data = array();
		foreach($lines as $line) {
			$data[] = explode(';', chop($line));
		}
		return $data;
	}
	//Color de Texto y las lineas
	public function Header(){
	/*Poner Logo_1 escudo de Bolivia*/
		$image_file = K_PATH_IMAGES.'logo_2.jpg';
		$this->Image($image_file,10,05,15, '' , 'JPG', '', 'T', false, 300, '', false, false, 0, false, false, false);
	/*Poner color al texto y las lineas*/
		$this->SetTextColor(0,0,0);
		$this->SetDrawColor(0,0,0);
	/*Definicion de variables*/
		$this->SetFont('helvetica', 'B', 12);
		$this->Cell(0, 0, 'GOBIERNO AUTONOMO DEPARTAMENTAL DE COCHABAMBA', 0, 1, 'C', 0, '', 1);
		$this->SetFont('helvetica','',9);
		$this->Cell(20);
		$this->Cell(0, 0, 'SECRETARIA DEPARTAMENTAL DE OBRAS Y SERVICIOS', 0, 1, 'C', 0, '', 1);
		$this->SetFont('helvetica','',9);
		$this->Cell(15);
		$this->Cell(0, 0, 'DIRECCION DE TRANSPORTES Y TELECOMUNICACIONES', 0, 1, 'C', 0, '', 1);
		$this->Cell(10);
		$this->SetFont('helvetica', 'B', 12);
		$this->Cell(0, 0, 'REPORTE DE REGISTRO DE INFRACCIONES', 0, 1, 'C', 0, '', 1);
		$this->Cell(10);

	}
	//Pie de Pagina
	public function Footer(){
//		/*Establecemos color de texto*/
		$this->SetTextColor(0,0,0);
//		/*insertamos numero de pagina y total depaginas*/
		$this->Cell(0, 10, 'Pag. '.$this->getAliasNumPage().
				   '/'.
				   $this->getAliasNbPages(),
				   0, false, 'C', 0, '', 0, false, 'T', 'M');
		$this->SetDrawColor(255,0,0);
		//date("d-m-Y,time()")
	//	/*Dibujamos linea roja*/
		$this-> Line(15,282,195,282);
	}
	
	
	// Colored table
	public function ColoredTable($header,$data) {
		// Colors, line width and bold font
		$this->SetFillColor(210, 210, 210);
		$this->SetTextColor(10);
		$this->SetDrawColor(210, 210, 210);
		$this->SetLineWidth(0.3);
		$this->SetFont('', 'B');
		// Header
		
		$w = array(15, 45, 30, 60, 40, 50 , 40);
		$num_headers = count($header);
		for($i = 0; $i < $num_headers; ++$i) {
			$this->Cell($w[$i], 7, $header[$i], 1, 0, 'C', 1);
		}
		$this->Ln();
		// Color and font restoration
		$this->SetFillColor(240, 240, 240);
		$this->SetTextColor(0);
		$this->SetFont('');
		// Data
		$fill = 0;
		foreach($data as $row) {
			$this->cell($w[0], 6, $row['infractionregisterid'], 'LR', 0, 'C', $fill);
			$this->cell($w[1], 6, $row['infractionnumberticket'], 'LR', 0, 'C', $fill);
			$this->cell($w[2], 6, $row['descriptioninfraction'], 'LR', 0, 'C', $fill);
			$this->cell($w[3], 6, $row['amountinfraction'], 'LR', 0, 'C', $fill);
			$this->cell($w[4], 6, $row['vehiclelicense'], 'LR', 0, 'C', $fill);
			$this->cell($w[5], 6, $row['propietaryci'], 'LR', 0, 'C', $fill);
			$this->cell($w[6], 6, $row['infractionregisterstate'], 'LR', 0, 'C', $fill);
			$this->Ln();
			$fill=!$fill;

		}
		$this->Cell(array_sum($w), 0, '', 'T');
	}
}

$sql = "SELECT * FROM infraction_register LIMIT 0,100";

$result = array();
if ($resultdb = $mysqli->query($sql)) {

	while($record = $resultdb->fetch_assoc()) {

		array_push($result, $record);
	}	

	$resultdb->close();
}

// create new PDF document
$pdf = new MYPDF('L', PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Sistema Union');
$pdf->SetTitle('Sistema de Informacion del Transporte de Cochabamba(SINTRAC)');
$pdf->SetSubject('Lista de Infracciones');

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

//set margenes
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

//set auto page breaks
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

//set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

//set some language-dependent strings
$pdf->setLanguageArray($l);

// ---------------------------------------------------------

// set font
$pdf->SetFont('helvetica', 'BI', 12);

// add a page
$pdf->AddPage();

//Column titles
$header = array('ID', 'No Boleta Infraccion', 'Infraccion', ' Monto', 'No. de Placa', 'C.I. Propietario', 'Estado');

// print colored table
$pdf->ColoredTable($header, $result);

// ---------------------------------------------------------

//Close and output PDF document
$pdf->Output('infracciones_union.pdf', 'I');

//============================================================+
// END OF FILE                                                
//============================================================+