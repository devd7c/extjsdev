<?php


require_once('../tcpdf/config/lang/eng.php');
require_once('../tcpdf/tcpdf.php');
require_once("../dbConnection.php");

// extend TCPF with custom functions
class MYPDF extends TCPDF {
	
	public function generar(){
	
		$this->load->library('Pdf');
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
	}

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
		 // Codigo de Barra para el Foot

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
		$this->Cell(0, 0, 'REPORTE DE USUARIOS DEL SISTEMA', 0, 1, 'C', 0, '', 1);
		$this->Cell(10);
		//$this->Line(30,23,285,23); 
	
	}	
		//Pie de Pagina
	public function Footer(){
//		/*Establecemos color de texto*/
		$this->SetTextColor(0,0,0);
//		/*insertamos numero de pagina y total depaginas*/
		$this->Cell(0, 10, 'Pag. '.$this->getAliasNumPage().
				   '-'.
				   $this->getAliasNbPages(),
				   0, false, 'C', 0, '', 0, false, 'T', 'M');
		$this->SetDrawColor(0,0,0);

	
	}
	// Colored table
	public function ColoredTable($header,$data) {

		$this->SetFillColor(210,210,210);
		$this->SetTextColor(10);
		$this->SetDrawColor(0,0,0);
		$this->SetLineWidth(0.3);
		$this->SetFont('helvetica', 'B',10);
		//$this->AddPage();
		// Header
		$w = array(10, 50, 50, 50);
		$num_headers = count($header);
		for($i = 0; $i < $num_headers; ++$i) {
			$this->Cell($w[$i], 7, $header[$i], 1, 0, 'C', 1);
		}
		$this->Ln();
		// Color and font restoration
	
		$this->SetFillColor(224, 235, 255);
		$this->SetTextColor(0);
		$this->SetFont('');
		// Data
		$fill = 0;
		foreach($data as $row) {

			$this->Cell($w[0], 6, $row['userid'], 'LR', 0, 'C', $fill);
			$this->Cell($w[1], 6, $row['username'], 'LR', 0, 'C', $fill);
			$this->Cell($w[2], 6, $row['email'], 'LR', 0, 'C', $fill);
			$this->Cell($w[3], 6, $row['privilegesid'], 'LR', 0, 'C', $fill);
			
			$this->Ln();
			$fill=!$fill;
		}
		$this->Cell(array_sum($w), 0, '', 'T');
	}
}
/*$sql = "SELECT c.cardoperationid, c.cardoperationstatus, c.cardoperationvalidity, c.nameprincipal,
		 c.namesecretary, c.operatorregisterid, c.vehicleid, ";
		$sql .= "c.last_update, r.adminresolutionid, r.operatorregisterstate, ";
		$sql .= "v.vehiclebrand, v.vehiclestatus, v.vehiclemodel, v.vehiclelicense, v.picture,
		 v.vehiclecapacity, v.vehiclecategory, v.vehiclechasis, v.vehicleclass, ";
		$sql .= "p.propietaryfirstname, p.propietarylastname, p.propietaryci, o.syndicatename, 
		o.operatorstate, o.operatormatrix FROM  card_operation c ";
		$sql .= "inner join operator_register r on c.operatorregisterid = r.operatorregisterid inner join vehicle v on c.vehicleid = v.vehicleid ";
		$sql .="inner join propietary p on v.propietaryid = p.propietaryid inner join operator o on r.operatorid = o.operatorid
		WHERE c.operatorregisterid = 1 limit $limit offset $start";*/



$sql = "SELECT * FROM user LIMIT 0,100";
$result = array();
if ($resultdb = $mysqli->query($sql)) {

	while($record = $resultdb->fetch_assoc()) {

		array_push($result, $record);
	}	

	$resultdb->close();
}

// create new PDF document
$pdf = new MYPDF('L', PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// Informaci贸n referente al PDF
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Sistema Union');
$pdf->SetTitle('Sistema de Informacion del Transporte de Cochabamba(SINTRAC)');
$pdf->SetSubject('Reporte de Usuarios del Sistema');

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

//set margins
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);
$pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE.' >> '.date( 'd-M-Y' ).' // '.date( 'H:i:s' ),PDF_HEADER_STRING);
//set auto page breaks
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

//set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

//set some language-dependent strings
$pdf->setLanguageArray($l);

// ---------------------------------------------------------

$pdf->SetFont('helvetica', '', 8);
/*Poner hora y fecha*/
//$pdf->ezText("<b>Fecha:</b> ".date("d/m/Y"), 10);
//$pdf->ezText("<b>Hora:</b> ".date("H:i:s")."\n\n",10);
// add a page
$pdf->AddPage();
  // Codigo de Barra para el Foot
$pdf->SetBarcode(date("Y-m-d H:i:s", time()));
//Column titles
$header = array('ID', 'Nombre Completo', 'Email', 'Privilegios');

// print colored table
$pdf->ColoredTable($header, $result);
//fechas

 // date, order ref 
 //$pdf -> CreateTextBox ( 'Date: ' . date ( 'Y-m-d' ) ,   0 ,   100 ,   0 ,   10 ,   10 ,   '' ,   'R' ) ; 
 //$pdf -> CreateTextBox ( 'Order ref.: #6765765' ,   0 ,   105 ,   0 ,   10 ,   10 ,   '' ,   'R' ) ; 

// ---------------------------------------------------------

//Close and output PDF document
$pdf->Output('res.administrativas_union.pdf', 'I');

//============================================================+
// END OF FILE                                                
//============================================================+