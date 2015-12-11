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
	/*Poner Logo_1 escudo de cbba*/
		$this->Cell(80);
		$image_file = K_PATH_IMAGES.'logo_2.jpg';
		$this->Image($image_file,15,05,15, '' , 'JPG', '', 'T', false, 300, '', false, false, 0, false, false, false);
		$tcpdf->xheadertext = 'Fecha: '. date('d-m-Y',time());
	/*Poner color al texto y las lineas*/
		$this->SetTextColor(0,0,0);
		$this->SetDrawColor(0,0,0);
		
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
		$this->Cell(0, 0, 'REPORTE DE UNIDADES DE TRANSPORTE', 0, 1, 'C', 0, '', 1);
		$this->Cell(10);
		//$this->Line(30,23,285,23); 
	
	}	
		//Pie de Pagina
	public function Footer(){
//		/*Establecemos color de texto*/
		$this->SetTextColor(0,0,200);
//		/*insertamos numero de pagina y total depaginas*/
		$this->Cell(0, 10, 'Pagina '.$this->getAliasNumPage().
				   '/'.
				   $this->getAliasNbPages(),
				   0, false, 'C', 0, '', 0, false, 'T', 'M');
		$this->SetDrawColor(255,0,0);
	//	/*Dibujamos linea roja*/
		$this-> Line(15,282,195,282);
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
		$w = array(8, 15, 15, 16, 15, 10, 25, 25);
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
			$this->Cell($w[0], 6, $row['vehicleid'], 'LR', 0, 'C', $fill);
			$this->Cell($w[1], 6, $row['vehiclecategory'], 'LR', 0, 'C', $fill);
			$this->Cell($w[2], 6, $row['vehiclecapacity'], 'LR', 0, 'C', $fill);
			$this->Cell($w[3], 6, $row['vehicleclass'], 'LR', 0, 'C', $fill);
			$this->Cell($w[4], 6, $row['vehiclebrand'], 'LR', 0, 'C', $fill);
			$this->Cell($w[5], 6, $row['vehiclemodel'], 'LR', 0, 'C', $fill);
			$this->Cell($w[6], 6, $row['vehiclechasis'], 'LR', 0, 'C', $fill);
			$this->Cell($w[7], 6, $row['operatorid'], 'LR', 0, 'C', $fill);
			$this->Ln();
			$fill=!$fill;
		}
		$this->Cell(array_sum($w), 0, '', 'T');
	}
}
$sql = "SELECT * FROM vehicle LIMIT 0,100";

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
$pdf->SetTitle('Reporte Vehiculos');
$pdf->SetSubject('Lista de Vehiculos');

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

//set margins
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);//10
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
$pdf->SetFont('helvetica', '', 7);

// add a page
$pdf->AddPage();

//Column titles
$header = array('ID', 'Categoria', 'Capacidad', 'Clase', 'Marca', 'Modelo', 'No.Chasis', 'Operador');

// print colored table
$pdf->ColoredTable($header, $result);

// ---------------------------------------------------------

//Close and output PDF document
$pdf->Output('vehiculos_union.pdf', 'I');

//============================================================+
// END OF FILE                                                
//============================================================+