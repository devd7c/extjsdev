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
	public function Header(){
	/*Poner Logo_1 escudo de Bolivia*/
		$image_file = K_PATH_IMAGES.'logo_2.jpg';
		$this->Image($image_file,10,05,15, '' , 'JPG', '', 'T', false, 300, '', false, false, 0, false, false, false);
	/*Poner color al texto y las lineas*/
		$this->SetTextColor(0,0,0);
		$this->SetDrawColor(0,0,0);
		$tcpdf->xheadertext = 'Fecha:' . date('d-m-Y', time());
		$this->SetFont('helvetica', 'B', 12);
		$this->Cell(0, 0, 'GOBIERNO AUTONOMO DEPARTAMENTAL DE COCHABAMBA', 0, 1, 'C', 0, '', 1);
		$this->SetFont('helvetica','',9);
		$this->Cell(20);
		$this->Cell(0, 0, 'Secretaria Departamental de Obras y Servicios', 0, 1, 'C', 0, '', 1);
		$this->SetFont('helvetica','',9);
		$this->Cell(15);
		$this->Cell(0, 0, 'Direccion de Transportes y Telecomunicaciones', 0, 1, 'C', 0, '', 1);
		$this->Cell(10);
		$this->SetFont('helvetica', 'B', 12);
		$this->Cell(0, 0, 'REPORTE DE REGISTRO  OPERADORES', 0, 1, 'C', 0, '', 1);
		$this->Cell(10);
		
	}
		//Pie de Pagina
	public function Footer(){
//		/*Establecemos color de texto*/
		$this->SetTextColor(0,0,0);
//		/*insertamos numero de pagina y total depaginas*/
		$this->Cell(0, 10, 'Pag.'.$this->getAliasNumPage().
				   '/'.
				   $this->getAliasNbPages(),
				   0, false, 'C', 0, '', 0, false, 'T', 'M');
		$this->SetDrawColor(255,0,0);
		$fecha = date("d-m-y --- h : i : s A");
		//$pdf->Cell(50,10,'Fecha y hora de inscripcion : ');
		$fechaActual = date("d/m/Y"); //ej: 07/05/2008 
		// Obiente la hora actual del sistema 
		$horaActual = date("H:m:s"); //ej: 10:53:27 
	}

	// Colored table
	public function ColoredTable($header,$data) {
		// Colors, line width and bold font
		$this->SetFillColor(210,210,210);
		$this->SetTextColor(10);
		$this->SetDrawColor(210, 210, 210);
		$this->SetLineWidth(0.3);
		$this->SetFont('', 'B');
		// Header
		$w = array(10, 60, 30, 30);
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
			$this->Cell($w[0], 6, $row['operatorregisterid'], 'LR', 0, 'C', $fill);
			//$this->Cell($w[1], 6, $row['operatorregisterzonestart'], 'LR', 0, 'C', $fill);
			$this->Cell($w[1], 6, $row['operatorregisterroutestart'], 'LR', 0, 'C', $fill);
			//$this->Cell($w[3], 6, $row['operatorregisterzonefinish'], 'LR', 0, 'C', $fill);
			$this->Cell($w[2], 6, $row['operatorregisterroutefinish'], 'LR', 0, 'C', $fill);
			$this->Cell($w[3], 6, $row['operatorregisterstate'], 'LR', 0, 'C', $fill);
			//$this->Cell($w[6], 6, $row['operatorid'], 'LR', 0, 'C', $fill);
			//$this->Cell($w[7], 6, $row['adminresolutionid'], 'LR', 0, 'C', $fill);
			$this->Ln();
			$fill=!$fill;
		}
		$this->Cell(array_sum($w), 0, '', 'T');
	}
}

//load data
$sql = "SELECT * FROM operator_register LIMIT 0,100";
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
$pdf->SetTitle('Sistema de Informacion de Transporte Cochabamba(SINTRAC)');
$pdf->SetSubject('Lista de Registro de Operadores');

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

//Correjir Los Margenes
//$pdf->SetMargins(72, 36, 72, true);
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
$pdf->SetFont('helvetica', '', 9);

// add a page
$pdf->AddPage();

//Column titles
$header = array('ID', 'Ruta Inicio', 'Ruta Final', 'Estado');

// print colored table
$pdf->ColoredTable($header, $result);

// ---------------------------------------------------------

//Close and output PDF document
$pdf->Output('operadores_union.pdf', 'I');

//============================================================+
// END OF FILE                                                
//============================================================+